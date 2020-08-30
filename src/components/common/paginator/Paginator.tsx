import React, {useState} from "react";
import styles from "./Paginator.module.css";
import cn from "classnames";

// import cn from 'classnames'
// cn('menu','active')//'menu active'
// let isActive = true
// cn('menu',{'active':isActive})//'menu active'
// isActive = false
// cn('menu',{'active':isActive})//'menu'
// [library to merge style class names]

type PropsType = {
    currentPageNumber: number
    totalItemsCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

//portionSize?: number
//[?] - means not necessary

let Paginator: React.FC<PropsType> = ({currentPageNumber,
                                          totalItemsCount,
                                          pageSize,
                                          onPageChanged,
                                          portionSize = 10}) => {

    let pagesCount: number = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<number>= [];
    for (let pageNumber = 1; pageNumber <= pagesCount; pageNumber++) {
        pages.push(pageNumber);
    }

    let portionCount: number = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);

    let leftPortionPageNumber : number = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber: number = portionNumber * portionSize;

    return (
        <div className={styles.paginator}>

            {portionNumber > 1 && <button onClick={
                () => {
                    setPortionNumber(portionNumber - 1)
                }
            }>Prev</button>}

            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(pageNumber => {
                    return (
                        <span className={cn({
                            [styles.selectedPage]: currentPageNumber === pageNumber
                        }, styles.pageNumber)}
                              key={pageNumber}
                              onClick={(e) => {
                                  if (currentPageNumber !== pageNumber) {
                                      onPageChanged(pageNumber)
                                  }
                              }}>
                            {pageNumber}
                        </span>
                    )
                })
            }

            {portionCount > portionNumber && <button onClick={
                () => {
                    setPortionNumber(portionNumber + 1)
                }
            }>Next</button>}
        </div>
    )
};


export default Paginator;