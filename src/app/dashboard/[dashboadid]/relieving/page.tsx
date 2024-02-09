'use client'

import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import {useEffect, useState} from "react";
import {CheckCheck, X} from "lucide-react"
import { toast } from "sonner";

let initReq: Relive_Request[];
const Page = () => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [getReq, setReq] = useState(initReq);
    const path = useParams();
    const Id = path.dashboadid;
    const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
      
        fetch("http://localhost:3000/api/request/getall", {
          method: "POST",  // Correcting the method name
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken }),  // Wrapping the accessToken in an object
        })
        .then((response) => response.json())
        .then((responseData) => {
          setReq(responseData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      }, []);

      const request = getReq?.filter((request) => {
        return request.relieving_officer.id === Id
      });

      const handleAccept = async (id: string) => {
        toast.loading('loading...')
            const accessToken = localStorage.getItem("accessToken");
            const accept_or_decline = true; 
            const relieveId = id

            const res = await fetch("http://localhost:3000/api/request/update", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    accept_or_decline, accessToken, relieveId
                })
            });

            const response = await res.json();
            if (res.ok) {
                const message = response.message;
                toast.success(message);
                router.back();
            } else {
                const message = response.message;
                toast.error(message);
            }
      }

      const handleDecline = async (id: string) => {
        toast.loading('loading...')
        const accessToken = localStorage.getItem("accessToken");
        const accept_or_decline = false;
        const relieveId = id;

        const res = await fetch("http://localhost:3000/api/request/update", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accept_or_decline, accessToken, relieveId
            })
        });

        const response = await res.json();
        if (res.ok) {
            const message = response.message;
            toast.success(message);
            setTimeout(() => {
                location.reload(); // reloads the page from the server, ignoring the cache
              }, 2000);
        } else {
            const message = response.message;
            toast.error(message);
        }
  }

      const pageCount = Math.ceil(getReq?.length / itemsPerPage);

      

      const handleClick = (page: number) => {
        setCurrentPage(page);
      };

      const handlePrevClick = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    
      const handleNextClick = () => {
        if (currentPage < pageCount) {
          setCurrentPage(currentPage + 1);
        }
      };

      const renderPaginationLinks = () => {
        const paginationLinks = [];
        for (let i = 1; i <= pageCount; i++) {
          paginationLinks.push(
            <span
              key={i}
              onClick={() => handleClick(i)}
              className={currentPage === i ? 'active' : ''}
            >
              {i}
            </span>
          );
        }
        return paginationLinks;
      };

      const renderData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
    
        return request?.slice(startIndex, endIndex).map((item, index) => (
          <tr className={styles.tr} key={index}>
            {/* Render your data cells here */}
            <td className={styles.td}>{item.relieve_leave.title}</td>
            <td className={styles.td}>{item.requesting_officer.firstname + " " + item.requesting_officer.lastname}</td>
            <td className={styles.td}>{item.accept_relieve === null ? <p>Not reviewed</p> : (item.accept_relieve === true ? <p>accepted</p>: <p>declined</p>)}</td>
            <td className={styles.td}>{item.acceptance_date ? <p>{item.acceptance_date}</p> : <p>N/A</p>}</td>
            <td className={styles.td}>
            <button
            onClick={() => handleAccept(item.id)}
            className={styles.accept}
            >
                <CheckCheck />
                </button></td>
            <td className={styles.td}>
                <button 
                onClick={() => handleDecline(item.id)}
                className={styles.decline}>
                <X />
                </button></td>
          </tr>
        ));
      };

    return (
        <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>title</th>
              <th className={styles.th}>requesting officer</th>
              <th className={styles.th}>request status</th>
              <th className={styles.th}>acceptance_date</th>
              <th className={styles.th}>accept</th>
              <th className={styles.th}>decline</th>
            </tr>
          </thead>
          <tbody>{renderData()}</tbody>
        </table>
  
        <div className={styles.pagination}>
        <button onClick={handlePrevClick}>Previous</button>
        {renderPaginationLinks()}
        <button onClick={handleNextClick}>Next</button>
      </div>
      </div>
    )
}

export default Page;