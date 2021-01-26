async function route() {
  const routes = [
    { path: "/", view: () => console.log("Hello i'm dashboard") },
    { path: "/posts", view: () => console.log("Hello i'm Posts") },
    { path: "/settings", view: () => console.log("Hello i'm settings") },
  ];

  //   teste de  cada rota para correspondência
  const potentialMatch = routes.map((route) => {
    return {
      route,
      isMatch: location.pathname === route.path,
    };
  });
}
