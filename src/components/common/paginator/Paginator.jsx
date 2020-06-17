import React from "react";
import styles from "./Paginator.module.css";


let Paginator = ({currentPage, totalUsersCount, pageSize, onPageChanged, ...props}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let pageNumber = 1; pageNumber <= pagesCount; pageNumber++) {
        pages.push(pageNumber);
    }

    return (
        <div>
            {pages.map(pageNumber => {
                return (
                    <span className={currentPage === pageNumber && styles.selectedPage}
                        onClick={(e) => {
                            onPageChanged(pageNumber)
                        }}>
                        {pageNumber}
                    </span>
                )
            })}
        </div>
    )
};


export default Paginator;