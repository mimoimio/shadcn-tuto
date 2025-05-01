import { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Recipe {
  image: string;
  title: string;
  time: number;
  description: string;
  vegan: boolean;
  id: string;
}

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch("http://localhost:4000/recipes");
  await new Promise((resolve) => setTimeout(resolve, 200));
  return result.json();
}

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="flex flex-col justify-between">
            <CardHeader className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage src={`/img/${recipe.image}`} alt="recipe img" />
                <AvatarFallback>
                  {recipe.title.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{recipe.title} </CardTitle>
                <CardDescription>{recipe.time} mins to cook</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{recipe.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button >View Recipt</Button>
              {recipe.vegan && <Badge variant="secondary">Vegan</Badge>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
