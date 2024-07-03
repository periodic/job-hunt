'use server'
import { createUpdate } from "@/database/update";
import { isValidState } from "@/model/opportunity-state";
import { revalidatePath } from "next/cache";

type ActionErrors = {
  state?: 'missing' | 'invalid';
  notes?: 'invalid';
}

export async function addUpdate(opportunityId: number, prevState: unknown, formData: FormData): Promise<ActionErrors> {
  "use server"
  const state = formData.get('state');
  const notes = formData.get('notes') || '';

  if (!isValidState(state)) {
    throw new Error(`Invalid state transition: ${state}`);
  }

  if (typeof notes !== 'string'
  ) {
    throw new Error(`Got file data from form when only strings are expected.`)
  }
  
  const updateId = await createUpdate(opportunityId, state, notes);

  revalidatePath(`/opportunity/${opportunityId}`)
  return {}
}
