import React, { useState, useEffect, useCallback } from "react";

const TOTAL_PAGES = 29;

// 圖片從 Hugging Face dataset 載入
const IMAGE_BASE_PATH =
  "https://huggingface.co/datasets/jen900704/portfolio-assets/resolve/main/art-therapy-portfolio-2023";

const pageImages = Array.from({ length: TOTAL_PAGES }, (_, i) => {
  const pageNumber = i + 1;
  // 檔名大小寫要跟 Hugging Face 上的一樣，如果那邊是 .PNG 就用 .PNG
  return `${IMAGE_BASE_PATH}/Slide${pageNumber}.PNG`;
});



export function PortfolioFlipbook() {
  const [page, setPage] = useState(0); // 0-based index

  // 右鍵：下一張（循環）
  const goNext = useCallback(() => {
    setPage((prev) => (prev + 1) % TOTAL_PAGES);
  }, []);

  // 左鍵：上一張（循環）
  const goPrev = useCallback(() => {
    setPage((prev) => (prev - 1 + TOTAL_PAGES) % TOTAL_PAGES);
  }, []);

  const goToPage = useCallback((target: number) => {
    setPage(() => {
      if (target < 0) return 0;
      if (target > TOTAL_PAGES - 1) return TOTAL_PAGES - 1;
      return target;
    });
  }, []);

  // 鍵盤：← → 切換
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  // 自動播放：每 4 秒換一張，手動翻頁時會重新計時
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPage((prev) => (prev + 1) % TOTAL_PAGES);
    }, 4000);
    return () => window.clearInterval(intervalId);
  }, [page]);

  // 10 頁一組的分頁列：First / «10 / ‹ / 1..10 / › / 10» / Last
  const renderPager = () => {
    const blockSize = 10;
    const currentIndex = page; // 0-based
    const currentBlock = Math.floor(currentIndex / blockSize);

    const blockStart = currentBlock * blockSize; // 0-based
    const blockEnd = Math.min(blockStart + blockSize - 1, TOTAL_PAGES - 1);

    const isFirstBlock = currentBlock === 0;
    const isLastBlock = blockEnd === TOTAL_PAGES - 1;

    const buttons: React.ReactElement[] = [];

    // nav helper
    const addNav = (
      key: string,
      label: string,
      targetIndex: number,
      disabled: boolean
    ) => {
      buttons.push(
        <button
          key={key}
          type="button"
          className={
            "flipbook-page-nav" + (disabled ? " flipbook-page-nav--disabled" : "")
          }
          onClick={() => !disabled && goToPage(targetIndex)}
          disabled={disabled}
        >
          {label}
        </button>
      );
    };

    // First / «10 / ‹
    addNav("first", "First", 0, page === 0);
    addNav(
      "prevBlock",
      "« 10",
      Math.max(0, blockStart - blockSize),
      isFirstBlock
    );
    addNav("prev", "‹", (page - 1 + TOTAL_PAGES) % TOTAL_PAGES, false);

    // 數字頁碼
    for (let i = blockStart; i <= blockEnd; i += 1) {
      const display = i + 1;
      const isActive = i === currentIndex;
      buttons.push(
        <button
          key={`page-${display}`}
          type="button"
          onClick={() => goToPage(i)}
          className={
            "flipbook-page-dot" + (isActive ? " is-active" : "")
          }
        >
          {display}
        </button>
      );
    }

    // › / 10 » / Last
    addNav("next", "›", (page + 1) % TOTAL_PAGES, false);
    addNav(
      "nextBlock",
      "10 »",
      Math.min(TOTAL_PAGES - 1, blockStart + blockSize),
      isLastBlock
    );
    addNav(
      "last",
      "Last",
      TOTAL_PAGES - 1,
      page === TOTAL_PAGES - 1
    );

    return <div className="flipbook-pager">{buttons}</div>;
  };

  return (
    <div className="flipbook">
      <div className="flipbook-controls">
        <button onClick={goPrev}>
          ‹ Prev
        </button>

        <div className="flipbook-controls-center">
          <span className="flipbook-page-indicator">
            Page {page + 1} / {TOTAL_PAGES}
          </span>
        </div>

        <button onClick={goNext}>
          Next ›
        </button>
      </div>

      <div className="flipbook-frame">
        <img
          src={pageImages[page]}
          alt={`2023 Art Therapy Portfolio – slide ${page + 1}`}
          className="flipbook-image"
        />
      </div>

      {renderPager()}
    </div>
  );
}

