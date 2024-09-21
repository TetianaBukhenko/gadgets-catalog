export async function timerPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('timerCompleted');
    }, 500);
  });
}
