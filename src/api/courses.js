export async function fetchCourses() {
  // Simulate network delay and event loop with setTimeout
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        // Simulate fetching from API
        const response = [
          { id: 1, name: 'HTML Basics' },
          { id: 2, name: 'CSS Mastery' },
          { id: 3, name: 'JavaScript Pro' },
          { id: 4, name: 'React In Depth' }
        ];
        resolve(response);
      } catch (error) {
        reject('Failed to fetch courses');
      }
    }, 1000); // 1 second delay
  });
} 