"use client";

interface YearListProps {
  years: number[];
  yearCounts: Map<number, number>;
  selectedYear: string;
  yearExpanded: boolean;
  onYearChange: (year: string) => void;
  onToggleExpand: () => void;
}

export default function YearList({
  years,
  yearCounts,
  selectedYear,
  yearExpanded,
  onYearChange,
  onToggleExpand,
}: YearListProps) {
  const recentYears = years.slice(0, 2);
  const hiddenYears = years.slice(2);
  const shouldKeepSelected =
    selectedYear !== "all" && hiddenYears.includes(Number(selectedYear)) && !yearExpanded;
  const visibleYears = shouldKeepSelected
    ? [...recentYears, Number(selectedYear)]
    : recentYears;
  const overflowYears = shouldKeepSelected
    ? hiddenYears.filter((y) => String(y) !== selectedYear)
    : hiddenYears;

  return (
    <aside className="timeline-panel">
      <div className="panel-title">
        <span>年份</span>
        <strong>{years.length}</strong>
      </div>
      <div
        className={`year-list${yearExpanded && overflowYears.length > 0 ? " is-expanded" : ""}`}
        id="yearList"
      >
        <button
          type="button"
          className={selectedYear === "all" ? "is-active" : ""}
          data-year="all"
          onClick={() => onYearChange("all")}
        >
          <span>全部</span>
          <strong>{Array.from(yearCounts.values()).reduce((a, b) => a + b, 0)}</strong>
        </button>
        {visibleYears.map((year) => (
          <button
            key={year}
            type="button"
            className={String(year) === selectedYear ? "is-active" : ""}
            data-year={year}
            onClick={() => onYearChange(String(year))}
          >
            <span>{year}</span>
            <strong>{yearCounts.get(year) ?? 0}</strong>
          </button>
        ))}
        {overflowYears.length > 0 && (
          <button
            type="button"
            className="year-toggle"
            onClick={onToggleExpand}
          >
            <span>
              {yearExpanded ? "收起年份" : `更多年份 +${overflowYears.length}`}
            </span>
            <strong />
          </button>
        )}
      </div>
      {yearExpanded && overflowYears.length > 0 && (
        <div className="year-overflow">
          {overflowYears.map((year) => (
            <button
              key={year}
              type="button"
              className={String(year) === selectedYear ? "is-active" : ""}
              data-year={year}
              onClick={() => onYearChange(String(year))}
            >
              <span>{year}</span>
              <strong>{yearCounts.get(year) ?? 0}</strong>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}