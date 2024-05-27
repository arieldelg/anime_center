import { useEffect, useState } from "react";
import { useBoundStore } from "../Stores/boundleStore";
import { Tpagination } from "../lib/types";

type TpaginationProps = {
  pagination: Tpagination;
};

const Pagination = ({ pagination }: TpaginationProps) => {
  const genrePage = useBoundStore((state) => state.genrePage);
  const setGenrePage = useBoundStore((state) => state.setGenrePage);
  const currentSet = useBoundStore((state) => state.currentSet);
  const setCurrentSet = useBoundStore((state) => state.setCurrentSet);
  const genreArray = useBoundStore((state) => state.genreArray);
  const currentPages = useBoundStore((state) => state.currentPages);
  const setCurrentPages = useBoundStore((state) => state.setCurrentPages);
  const numberOfPages = 10;
  const [disable, setDisable] = useState(false);

  const [next, setNext] = useState(0);

  const handleNext = (): void => {
    setDisable(false);
    if (pagination.has_next_page) {
      const pageNotRefresh = genrePage + 1;
      if (pageNotRefresh === currentPages[currentPages.length - 1]) {
        setCurrentSet(currentSet + 1);
        setNext(1);
      }
    }
    setGenrePage(genrePage + 1);
  };
  const handleBack = (): void => {
    if (genrePage > 1) {
      setGenrePage(genrePage - 1);
      const pageNotRefresh = genrePage - 1;
      if (pageNotRefresh === currentPages[0] && pageNotRefresh !== 1) {
        setCurrentSet(currentSet - 1);
        setNext(2);
      }
    }
  };

  useEffect(() => {
    let splice;
    if (genreArray) {
      const newPagination = [...genreArray];
      if (currentSet === 1) {
        const lastiIndex = numberOfPages * currentSet;
        const firstIndex = lastiIndex - numberOfPages;
        splice = newPagination?.splice(firstIndex, numberOfPages);
      } else if (currentSet !== 1) {
        if (next === 1) {
          const forward = currentPages[currentPages.length - 1];
          const newNumber = forward - 2;
          splice = newPagination?.splice(newNumber, numberOfPages);
        } else if (next === 2) {
          const backwards = genrePage;
          const newNumber = backwards - numberOfPages;
          splice = newPagination?.splice(newNumber + 1, numberOfPages);
        }
      }
    }
    setCurrentPages(splice || currentPages);
    return () => {};
  }, [genreArray, currentSet]);

  const handlePage = (number: number): void => {
    if (genreArray.length > 10) {
      if (number === currentPages[currentPages.length - 1]) {
        setCurrentSet(currentSet + 1);
        setNext(1);
      }
      if (number === currentPages[0] && number !== 1) {
        setCurrentSet(currentSet - 1);
        setNext(2);
      }
    }
    setGenrePage(number);
  };
  const handleDisableBack = (): boolean => {
    if (genrePage === 1) {
      return true;
    } else {
      return false;
    }
  };
  const handleDisableNext = (): boolean => {
    if (genrePage === genreArray.length) {
      return true;
    } else {
      return false;
    }
  };
  if (genreArray.length > 10) {
    return (
      <div className="flex gap-4 justify-center">
        <button type="button" onClick={handleBack} disabled={disable}>
          Back
        </button>

        {currentPages.map((element) => {
          if (genrePage === element) {
            return (
              <button
                className="text-slate-500 bg-slate-600/30"
                key={element}
                disabled={true}
              >
                {element}
              </button>
            );
          } else {
            return (
              <button
                key={element}
                onClick={() => handlePage(element)}
                disabled={false}
              >
                {element}
              </button>
            );
          }
        })}
        <div>
          <p>...</p>
          <p>{genreArray[genreArray?.length - 1]}</p>
        </div>
        <button type="button" onClick={handleNext}>
          Next
        </button>
      </div>
    );
  } else if (genreArray.length <= 10) {
    return (
      <div className="flex gap-4 justify-center">
        {genreArray.length !== 1 && (
          <button
            type="button"
            onClick={handleBack}
            disabled={handleDisableBack()}
          >
            Back
          </button>
        )}

        {currentPages.map((element) => {
          if (genrePage === element) {
            return (
              <button
                className="text-slate-500 bg-slate-600/30"
                key={element}
                disabled={true}
              >
                {element}
              </button>
            );
          } else {
            return (
              <button
                key={element}
                onClick={() => handlePage(element)}
                disabled={false}
              >
                {element}
              </button>
            );
          }
        })}
        {genreArray.length !== 1 && (
          <button
            type="button"
            onClick={handleNext}
            disabled={handleDisableNext()}
          >
            Next
          </button>
        )}
      </div>
    );
  }
};

export default Pagination;
