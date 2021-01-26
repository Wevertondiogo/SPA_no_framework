import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import Settings from "./views/Settings.js";

const PathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

function GetParams(match) {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
}

function NavigateTo(url) {
  history.pushState(null, null, url);
  Router();
}

async function Router() {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/posts/:id", view: PostView },
    { path: "/settings", view: Settings },
  ];

  //   teste de  cada rota para correspondência
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(PathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(GetParams(match));

  document.querySelector("#app").innerHTML = await view.getHtml();
}

function PreventRefreshToClickOnLink(e) {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    NavigateTo(e.target.href);
  }
}

window.addEventListener("popstate", Router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) =>
    PreventRefreshToClickOnLink(e)
  );
  Router();
});
