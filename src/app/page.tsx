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
// Import recipes directly
const recipes = [
  {
    "id": "1",
    "title": "Veggie Carbonara",
    "image": "veggie_carbonara.jpg",
    "time": 20,
    "description": "A healthy and flavorful twist on the classic Italian dish.",
    "vegan": false
  },
  {
    "id": "2",
    "title": "Mushroom Risotto",
    "image": "mushroom_risotto.jpg",
    "time": 30,
    "description": "Creamy and comforting, perfect for a cozy night in.",
    "vegan": false
  },
  {
    "id": "3",
    "title": "Quinoa Salad",
    "image": "quinoa_salad.jpg",
    "time": 15,
    "description": "Light and refreshing, ideal for a warm summer day.",
    "vegan": true
  },
  {
    "id": "4",
    "title": "Lentil Soup",
    "image": "lentil_soup.webp",
    "time": 45,
    "description": "Warm and hearty, perfect for a chilly evening.",
    "vegan": true
  },
  {
    "id": "5",
    "title": "Tofu Stir-Fry",
    "time": 25,
    "description": "A quick and easy vegan meal packed with flavor.",
    "vegan": true
  }
];
async function getRecipes(): Promise<Recipe[]> {
  // // Use relative URL to call our internal API route
  // try {
  //   const result = await fetch('/api/recipes', {
  //     // This ensures the data is cached at build time in production
  //     cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store'
  //   });

  //   return result.json();
  // } catch (error) {
  //   console.error('Failed to fetch recipes:', error);
  //   return []; // Return empty array as fallback
  // }
  return recipes;
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





