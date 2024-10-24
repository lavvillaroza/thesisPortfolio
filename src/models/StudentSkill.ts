import { SkillModel } from "./SkillModel";

export interface StudentSkillModel {
    id: number;
    skillRating: number;
    deleted: number;
    createdDate: string;
    lastModifiedDate: string;
    skill: SkillModel[];    
  }