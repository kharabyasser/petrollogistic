import { SelectListItem } from "../interfaces/select-list-item";

export function SelectOptionById(optionId: string, optionsList: SelectListItem[] | null): SelectListItem | null 
{
  if (!optionsList) return null;
  return optionsList.find(option => option.id === optionId) || null;
}