import { useEffect, type RefObject } from "react";

export function useScrollExperience(progressRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("is-visible");
          observer.unobserve(entry.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    const showAll = (event: MediaQueryListEvent) => {
      if (event.matches) {
        targets.forEach((target) => target.classList.add("is-visible"));
        observer.disconnect();
      }
    };
    reduceMotion.addEventListener("change", showAll);

    return () => {
      observer.disconnect();
      reduceMotion.removeEventListener("change", showAll);
    };
  }, []);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    let reduceMotion = motionQuery.matches;
    let mobileMotion = mobileQuery.matches;
    const flow = document.querySelector<HTMLElement>(".service-flow");
    const route = flow?.querySelector<SVGPathElement>(
      ".signal-route__progress",
    );
    const track = flow?.querySelector<SVGPathElement>(".signal-route__track");
    const routeSvg = flow?.querySelector<SVGSVGElement>(".signal-route");
    const traveler = flow?.querySelector<HTMLElement>(
      ".signal-route__traveler",
    );
    const routeLength = track?.getTotalLength() ?? 0;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    ).map((element) => ({
      element,
      top: element.getBoundingClientRect().top + window.scrollY,
      height: element.offsetHeight,
      depth: Number(element.dataset.parallax) || 1,
      kinetic: element.dataset.kinetic ?? "",
    }));
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const range =
          document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${range > 0 ? window.scrollY / range : 0})`;
        if (reduceMotion) return;

        if (flow && route && track && routeSvg && traveler && routeLength > 0) {
          const bounds = flow.getBoundingClientRect();
          const routeProgress = Math.max(
            0,
            Math.min(
              1,
              (window.innerHeight * 0.8 - bounds.top) /
                (bounds.height + window.innerHeight * 0.5),
            ),
          );
          route.style.strokeDashoffset = `${1000 * (1 - routeProgress)}`;
          const point = track.getPointAtLength(routeLength * routeProgress);
          const svgBounds = routeSvg.getBoundingClientRect();
          traveler.style.left = `${(point.x / 1000) * svgBounds.width}px`;
          traveler.style.top = `${(point.y / 1000) * svgBounds.height}px`;
          traveler.style.opacity =
            routeProgress > 0 && routeProgress < 1 ? "1" : "0";
        }

        const maxShift = mobileMotion ? 18 : 20;
        for (const target of targets) {
          const top = target.top - window.scrollY;
          const progress = Math.max(
            0,
            Math.min(
              1,
              (window.innerHeight - top) / (window.innerHeight + target.height),
            ),
          );
          const motionGain = target.kinetic ? (mobileMotion ? 1 : 1.1) : 1;
          const shift = (progress - 0.5) * maxShift * target.depth * motionGain;
          target.element.style.setProperty(
            "--scroll-shift",
            `${shift.toFixed(1)}px`,
          );
          if (target.kinetic === "title") {
            const maxTilt = mobileMotion ? 24 : 16;
            target.element.style.setProperty(
              "--kinetic-tilt",
              `${((0.5 - progress) * maxTilt).toFixed(1)}deg`,
            );
          } else if (target.kinetic === "cta") {
            const focus = Math.max(0, 1 - Math.abs(progress - 0.5) * 2);
            target.element.style.setProperty(
              "--kinetic-brightness",
              `${(1 + 0.16 * focus).toFixed(2)}`,
            );
          }
        }
      });
    };

    const refreshTargets = () => {
      mobileMotion = mobileQuery.matches;
      for (const target of targets) {
        const currentShift =
          Number.parseFloat(
            target.element.style.getPropertyValue("--scroll-shift"),
          ) || 0;
        target.top =
          target.element.getBoundingClientRect().top +
          window.scrollY -
          currentShift;
        target.height = target.element.offsetHeight;
      }
      update();
    };
    const onMotionChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      if (reduceMotion) {
        targets.forEach(({ element }) => {
          ["--scroll-shift", "--kinetic-tilt", "--kinetic-brightness"].forEach(
            (property) => element.style.removeProperty(property),
          );
        });
      }
      update();
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", refreshTargets, { passive: true });
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", refreshTargets);
      motionQuery.removeEventListener("change", onMotionChange);
      targets.forEach(({ element }) => {
        ["--scroll-shift", "--kinetic-tilt", "--kinetic-brightness"].forEach(
          (property) => element.style.removeProperty(property),
        );
      });
    };
  }, [progressRef]);
}
