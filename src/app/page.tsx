import TopBar from "@/components/TopBar";
import MapArea from "@/components/MapArea";
import ExplorePanel from "@/components/ExplorePanel";
import { AppProvider } from "@/lib/AppContext";

export default function Home() {
  return (
    <AppProvider>
      <main className="app">
        <TopBar />
        <section className="workspace mobile-map">
          <MapArea />
          <ExplorePanel />
        </section>
        <div className="support-actions support-map">
          <button
            type="button"
            className="support-toggle"
            aria-expanded="false"
            aria-label="支持与反馈"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
          </button>
          <div className="support-actions-menu">
            <button type="button" aria-label="我要反馈">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/></svg>
              <span>我要反馈</span>
            </button>
            <a href="https://ko-fi.com/haloha" target="_blank" rel="noreferrer" aria-label="请我喝杯咖啡">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>
              <span>请我喝杯咖啡</span>
            </a>
            <a href="https://ifdian.net/a/haloha" target="_blank" rel="noreferrer" aria-label="爱发电支持">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <span>爱发电支持</span>
            </a>
          </div>
        </div>
      </main>
    </AppProvider>
  );
}
