'use server';

import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";


export async function getInterviewsByUserId(userId: string): Promise<Interview[] | null> {
  const interviews = await db
  .collection('interviews')
  .where('userId', '==', userId)
  .orderBy('createdAt', 'desc')
  .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Interview[];
}

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
 const { userId, limit = 20} = params;
 
  const interviews = await db
  .collection('interviews')
  .orderBy('createdAt', 'desc')
  .where('finalized', '==', true)
  .where('userId', '!=', userId)
  .limit( limit )
  .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Interview[];
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db
  .collection('interviews')
  .doc(id)
  .get();

  return interview.data() as Interview | null;
}

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript } = params;


  try {
      const formattedTranscript = transcript
            .map((sentence: { role: string; content: string; }) => (
            `- ${sentence.role}: ${sentence.content}\n`
           )).join(''); 

         const { object: {totalScore, categoryScores, strengths, areasForImprovement, finalAssessment} } = await generateObject({
          model: google('gemini-2.0-flash-001', {
            structuredOutputs: false,
          }),
          schema: feedbackSchema,
          prompt: `
You are acting as a highly experienced, strict technical interviewer for a mock interview. Your job is to critically evaluate the candidate's performance, focusing on each of the structured categories listed below.

Please be extremely detailed, realistic, and critical in your assessment. If the candidate makes mistakes, overlooks key concepts, or provides vague answers, clearly highlight these in your feedback.

IMPORTANT:
If the candidate does not answer questions, gives blank responses, or skips most questions, you must assign very low scores (below 20), especially in Communication Skills, Technical Knowledge, and Problem-Solving. Be strict and realistic.

Use the provided transcript of the interview below:

Transcript:
${formattedTranscript}

Evaluate the candidate on a scale of 0 to 100 for EACH of these categories:
- Communication Skills: Clarity, articulation, logical flow, and confidence in speech.
- Technical Knowledge: Understanding of the key technical concepts relevant to the role.
- Problem-Solving: Analytical ability, problem decomposition, and solution strategies.
- Cultural & Role Fit: Alignment with company values, collaborative nature, and role suitability.
- Confidence & Clarity: Confidence level, avoidance of hesitation, and clear, concise answers.

In your analysis:
1. Score EACH category (0-100).
2. Provide a clear list of **Strengths** demonstrated in the interview.
3. Provide a clear list of **Areas for Improvement** (be brutally honest but constructive).
4. Provide a brief but thoughtful **Final Assessment** explaining whether the candidate seems prepared for a real interview and what they must focus on.

Return your response structured in JSON according to this schema:
{
  "totalScore": number,
  "categoryScores": {
    "Communication Skills": number,
    "Technical Knowledge": number,
    "Problem-Solving": number,
    "Cultural & Role Fit": number,
    "Confidence & Clarity": number
  },
  "strengths": [string],
  "areasForImprovement": [string],
  "finalAssessment": string
}
`,
      system:
        "You are a strict, realistic technical interviewer providing detailed feedback.",
    });

         const feedback = await db.collection('feedback').add({
          interviewId,
          userId,
          totalScore,
          categoryScores,
          strengths,
          areasForImprovement,
          finalAssessment,
          createdAt: new Date().toISOString()
         })

         return {
          success: true,
          feedbackId: feedback.id
         }

  }catch (e) {
    console.error('Error saving feedback', e)

    return { success: false}
  }
}

export async function getFeedbackByInterviewId(params: GetFeedbackByInterviewIdParams): Promise<Feedback | null> {
 const { interviewId, userId } = params;
 
  const feedback = await db
  .collection('feedback')
  .where('interviewId', '==', interviewId)
  .where('userId', '==', userId)
  .limit(1)
  .get();

if(feedback.empty) return null;

const feedbackDoc = feedback.docs[0];

return {
  id: feedbackDoc.id, ...feedbackDoc.data()
,    } as Feedback;

}
