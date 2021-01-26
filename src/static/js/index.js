function NavigateTo(url) {
  history.pushState(null, null, url);
  Router();
}
async function Router() {
  const routes = [
    { path: "/", view: () => console.log("Hello i'm dashboard") },
    { path: "/posts", view: () => console.log("Hello i'm Posts") },
    { path: "/settings", view: () => console.log("Hello i'm settings") },
  ];

  //   teste de  cada rota para correspondência
  const potentialMatches = routes.map((route) => {
    return {
      route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  console.log(match.route.view());
}

window.addEventListener("popstate", Router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      NavigateTo(e.target.href);
    }
  });
  Router();
});
