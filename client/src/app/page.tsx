import PageTitle from "@/components/PageTitle";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import RationalePage from "./rationale/page";
import SpecialtyCodePage from "@/components/Tables/SpecialtyCode";
import DecisionListPage from "@/components/Tables/DecisionListColumns";


export default function Home() {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent className="col-span-2">
          <RationalePage />
        </CardContent>
        <CardContent>
          <SpecialtyCodePage />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <DecisionListPage />
        </CardContent>

        {/*  */}
      </section>
    </div>
  );
}
