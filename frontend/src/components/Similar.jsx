import React, { useEffect } from "react";
import Navbar from "./ui/shared/Navbar";
import Footer from "./Footer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { Progress } from "./ui/progress"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USERCHOICE_API_ENDPOINT } from "@/utils/constant";
import { setAllSimilarUsers } from "@/redux/authSlice";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Similar = () => {
  const dispatch = useDispatch();
  const { allSimilarQuiz } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchSimilarUser = async () => {
      try {
        const res = await axios.get(`${USERCHOICE_API_ENDPOINT}getsimilaruser`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setAllSimilarUsers(res.data.userMatches));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSimilarUser();
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto border-gray-200 my-5 p-8 bg-white">
        <Table className="min-w-full rounded-sm text-white overflow-hidden">
          <TableCaption className="text-sm">A list of your similarity with other users.</TableCaption>

          <TableHeader>
            <TableRow className="bg-[#3168c7] hover:bg-[#3168c7]">
              <TableHead className="w-[100px] text-center py-3 text-white">SN</TableHead>
              <TableHead className="text-center py-3 text-white">Username</TableHead>
              <TableHead className="text-center py-3 text-white">Gender</TableHead>
              <TableHead className="text-center py-3 text-white">Similarity</TableHead>
              <TableHead className="text-center py-3 text-white">View Choice</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-[#174594]">
            {allSimilarQuiz?.map((similar, index) => (
              <TableRow key={similar._id} className="hover:bg-[#5c86da] hover:text-white transition-all duration-200">
                <TableCell className="text-center py-3 font-medium">{index + 1}</TableCell>
                <TableCell className="text-center py-3">{similar?.user?.fullname}</TableCell>
                <TableCell className="text-center py-3">
                  {similar?.user?.gender === 'male' ? (
                    <span>Male</span>
                  ) : similar?.user?.gender === 'female' ? (
                    <span>Female</span>
                  ) : (
                    <span>N/A</span>
                  )}
                </TableCell>
                <TableCell className="w-[220px] text-center py-3">
                  <div className="relative w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundColor:
                          similar?.matchPercentage > 75
                            ? '#22c55e'
                            : similar?.matchPercentage > 50
                            ? '#fbbf24'
                            : '#ef4444',
                        width: `${similar?.matchPercentage}%`,
                      }}
                    />
                    <div
                      className="w-full h-3 rounded-full shadow-md"
                      style={{
                        width: '100%',
                      }}
                    ></div>
                  </div>
                  {similar?.matchPercentage ? similar?.matchPercentage.toFixed(2) : '0.00'}%
                </TableCell>
                <TableCell className="text-center py-3">
                  <Link to={`/viewchoice/${similar?.user?._id}`}>
                    <Button variant="outline" className="text-[#3168c7]  hover:text-[#3168c7]">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Footer />
    </div>
  );
};

export default Similar;