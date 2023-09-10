export default function mockApiCall() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockData = {
        message: "Here is your mock data!",
        timestamp: new Date().toISOString(),
      };
      resolve(mockData);
    }, 5000);
  });
}
