import fs from "fs";
import path from "path";
import ReactDOMServer from "react-dom/server";
import App from "../../src/App";
import React from "react";
import createStore from "../../src/redux/createStore";
import { Provider } from "react-redux";

export default (req, res) => {

  fs.readFile(path.resolve("./build/index.html"), "utf-8", async (err, htmlData) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }

    try {
      const store = createStore();

      // Prepare Redux State
      store.dispatch({ type: "TOGGLE_SHOULD_TRACK", payload: true });


      ReactDOMServer.renderToString(
        <Provider store={store}>
          <App/>
        </Provider>
      );

      // Wait for API calls to finish
      await Promise.all(Object.values(store.getState().films.promises));
      store.dispatch({ type: "TOGGLE_SHOULD_TRACK", payload: false });

      const html =
        ReactDOMServer.renderToString(
          <Provider store={store}>
            <App/>
          </Provider>
        );

      // Clear and reset
      store.dispatch({ type: "RESET_PROMISES" });

      const preloadedState = store.getState();

      const string = htmlData.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>
            <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, "\\u003c")};
          </script>
`
      );

      return res.send(string);
    } catch (error) {
      console.warn(error);
      res.status(500).send("Error has occured on server during work(")
    }
  });

};
