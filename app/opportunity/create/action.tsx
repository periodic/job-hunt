'use server';
import * as Opportunity from "@/database/opportunity";
import { isValidState, type OpportunityState } from "@/model/opportunity-state";
import { redirect } from "next/navigation";

export type ActionErrors = {
  company?: 'missing' | 'invalid';
  role?: 'missing' | 'invalid';
  state?: 'missing' | 'invalid';
  notes?: 'invalid';
};

export async function createOpportunity(prevState: any, formData: FormData): Promise<ActionErrors> {
  "use server";
  const company = formData.get('company');
  const role = formData.get('role');
  const state = formData.get('state');

  const errors: ActionErrors = {};

  // TODO: use a real validation framework like zod.
  if (!role || role === '') {
    errors.role = 'missing';
  } else if (typeof role !== 'string') {
    errors.role = 'invalid';
  }

  if (!company || company === '') {
    errors.company = 'missing';
  } else if (typeof company !== 'string') {
    errors.company = 'invalid';
  }

  if (!state) {
    errors.state = 'missing';
  } else if (!isValidState(state)) {
    errors.state = 'invalid';
  }

  const notes = formData.get('notes') || '';
  if (typeof notes !== 'string') {
    errors.notes = 'invalid';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const opportunityId = await Opportunity.createOpportunity(company as string, role as string, state as OpportunityState, notes as string);

  redirect(`/opportunity/${opportunityId}`);
}
