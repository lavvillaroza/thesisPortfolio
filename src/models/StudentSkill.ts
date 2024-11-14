import { SkillModel } from "./SkillModel";

export interface StudentSkillModel {
    id: number;
    skillRating: number;
    createdDate: string;
    lastModifiedDate: string;
    skill: SkillModel[];    
  }