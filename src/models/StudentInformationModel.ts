export interface StudentInformationModel {
    id: number;
    aboutMe: string;
    userId: number;
    coverPhotoOne: string;
    coverPhotoTwo: string;
    coverPhotoThree: string;
    coverPhotoFour: string;
    coverPhotoOneFile: File | null; 
    coverPhotoTwoFile: File | null; 
    coverPhotoThreeFile: File | null; 
    coverPhotoFourFile: File | null;     
  }