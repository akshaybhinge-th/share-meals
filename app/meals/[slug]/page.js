import Image from "next/image";
import { notFound } from "next/navigation";

import classes from "./page.module.css";
import { getMealData } from "@/lib/actions";

export async function generateMetadata({ params }) {
  const meal = await getMealData(params.slug);
  if (!meal) {
    notFound();
  }
  return {
    title: meal.title,
    description: meal.summary,
  };
}

const MealDetailsPage = async ({ params }) => {
  const meal = await getMealData(params.slug);
  if (!meal) {
    notFound();
  }
  meal.instructions = meal?.instructions?.replace(/\n/g, "<br/>");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill priority />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
};

export default MealDetailsPage;
