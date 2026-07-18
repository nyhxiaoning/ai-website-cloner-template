"use client";

import { useEffect, useState } from "react";

interface HeroManifestoProps {
  quotes: [string, string][];
}

export default function HeroManifesto({ quotes }: HeroManifestoProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    if (quotes.length <= 1) return;
    const interval = setInterval(() => {
      setChanging(true);
      setTimeout(() => {
        setQuoteIndex((i) => (i + 1) % quotes.length);
        setChanging(false);
      }, 180);
    }, 7000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  const current = quotes[quoteIndex] ?? ["", ""];

  return (
    <section className="ledger-manifesto">
      <div className="manifesto-copy">
        <span className="section-label">阅读资产</span>
        <h1>让每一次阅读，都成为可回望的积累</h1>
        <p>
          把零散的阅读经历沉淀为清晰、可检索、可持续生长的个人知识档案。
          记录读过、在读、想读的书籍，追踪购买与拥有情况，附上阅读笔记。
        </p>
      </div>
      <figure className="reading-quote">
        <blockquote className={changing ? "is-changing" : ""}>{current[0]}</blockquote>
        <figcaption className={changing ? "is-changing" : ""}>
          — {current[1]}
        </figcaption>
      </figure>
    </section>
  );
}