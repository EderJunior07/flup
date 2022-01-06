
export interface IUser {
    userId: string,
    displayName: string,
    status: 0 | 1 | 2,
    avatarURL: string;
    bannerURL: string;
    profileRole: string;
    socialMedia: string[];
    peopleDescription: string,
}
