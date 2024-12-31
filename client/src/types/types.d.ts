declare global {
  // IDefaultAPIRes
  interface IDefaultAPIRes {
    status: number;
    message: string;
    success: boolean;
  }
  // IGoogleLoginRes
  interface IGoogleLoginApiRes extends Omit<IDefaultAPIRes, "data"> {
    data: {
      email: string;
      name: string;
      avatar: string;
    };
  }
}

export {};
