"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form";
import Image from "next/image"
import Link from 'next/link';
import { toast } from "sonner";
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

  
interface AuthFormProps {
  type: 'sign-up' | 'sign-in';
}



const authFormSchema = (type: 'sign-up' | 'sign-in') => {

   return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  })
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('Submitted values:', values); // Use values here

           if(type=== 'sign-up') {

             const { name, email, password } = values;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }
            toast.success('All set! Please sign in.');
            router.push('/sign-in');

           } else  {

 const { email, password } = values;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        });
            
            toast.success('Access granted..');
            router.push('/');
           }

    } catch (error) {
      console.log(error);
   toast.error("Invalid Credentials. Please try again.");
    }
  }

const isSignIn = type === 'sign-in';

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">

      <div className="flex flex-row gap-2 justify-center items-center">
  <div className="bg-white dark:bg-white p-1 rounded-md shadow-md">
    <Image src="/logo.svg" alt="logo" width={38} height={32}  />
  </div>
  <h2 className="text-gray-900 dark:text-white font-semibold">
    {type === "sign-up" ? "InterMetriq" : "InterMetriq"}
  </h2>
</div>

        <h3>Practice job interviews with AI</h3>
       
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form ">
      
                  {!isSignIn && (
                    <FormField 
                    control={form.control} 
                    name="name" 
                    label="Name" 
                    placeholder="Your Name" 
                    />
                  )}
                  <FormField 
                    control={form.control} 
                    name="email" 
                    label="Email" 
                    placeholder="Your Email Address" 
                    type="email"
                    />
                  <FormField 
                    control={form.control} 
                    name="password" 
                    label="Password" 
                    placeholder="Enter your password" 
                    type="password"
                    />

        <Button variant="default"
  className="btn"
  type="submit">
          {isSignIn ? 'Sign in' : 'Create an Account'}
          </Button>
      </form>
    </Form>

    <p className="text-center">
       {isSignIn ? 'No account yet?' : 'Have an account already?'}

       <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">
  {!isSignIn ? "Sign in" : 'Sign up'}
</Link>



    </p>
    </div>
    </div>
  )
}

export default AuthForm