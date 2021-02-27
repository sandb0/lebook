type AbstractResponse = {
  statusCode: number;
  error?: {
    messages: string[];
  };
};

export default AbstractResponse;
