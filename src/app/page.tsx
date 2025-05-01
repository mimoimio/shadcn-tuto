import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Recipe {
  image?: string;
  title: string;
  time: number;
  description: string;
  vegan: boolean;
  id: string;
}

async function getRecipes(): Promise<Recipe[]> {
  // Use relative URL to call our internal API route
  const url = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/recipes' // For development
    : 'https://' + process.env.VERCEL_URL + '/api/recipes'; // For production on Vercel

  try {
    const result = await fetch(url, {
      // This ensures the data is cached at build time in production
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store'
    });

    return result.json();
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    return []; // Return empty array as fallback
  }
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
              <Button>View Recipe</Button>
              {recipe.vegan && <Badge variant="secondary">Vegan</Badge>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}




