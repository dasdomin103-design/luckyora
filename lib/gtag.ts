export const trackGamePlay = (gameName: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "play_game", {
      game_name: gameName,
    });
  }
};

