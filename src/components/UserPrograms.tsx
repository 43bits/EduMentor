import Link from "next/link";
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpenIcon,
  Sparkles,
  Users,
  AppleIcon,
  ShieldIcon,
} from "lucide-react";
import { USER_PROGRAMS } from "@/constants";

const UserPrograms = () => {
  return (
    <div className="w-full pb-24 pt-16">
      <div className="container mx-auto max-w-6xl px-4">
        {/* HEADER */}
        <div className="bg-card/90 border border-border rounded-lg mb-16">
          <div className="p-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">AI-Generated </span>
              <span className="text-primary">Study Plans</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Personalized study programs created for different learning goals
            </p>
          </div>
        </div>

        {/* PROGRAM CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {USER_PROGRAMS.map((program) => (
            <Card
              key={program.id}
              className="bg-card/90 border border-border"
            >
              <CardHeader className="pt-6 px-5">
                <div className="flex items-center gap-4">
                  {/* <img
  src={program.profilePic}
  alt={`${program.first_name}'s profile picture`}
  className="h-16 w-16 rounded-full object-cover border"
/> */}

                  <div>
                    <CardTitle className="text-xl">
                      {program.first_name}
                      <span className="text-primary">.study</span>
                    </CardTitle>
                    <div className="text-sm text-muted-foreground flex gap-2">
                      <Users className="h-4 w-4" />
                      Age {program.age} • {program.study_days}d/week
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded text-sm flex gap-2">
                    <Sparkles className="h-4 w-4" />
                    {program.study_goal}
                  </div>
                  <div className="text-sm text-muted-foreground flex gap-2">
                    {/* <Clock className="h-4 w-4" /> */}
                    
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-5">
                <div className="space-y-5 pt-2">
                  {/* STUDY PLAN */}
                  <div className="flex gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-md">
                      <BookOpenIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {program.study_plan.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {program.study_plan.subjects.join(", ")}
                      </p>
                    </div>
                  </div>

                  {/* STUDY ROUTINE */}
                  <div className="flex gap-3">
                    <div className="p-2 bg-secondary/10 text-secondary rounded-md">
                      <AppleIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {program.nutrition_plan.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {program.nutrition_plan.highlights.join(", ")}
                      </p>
                    </div>
                  </div>

                  {/* LEARNING SUPPORT */}
                  <div className="flex gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-md">
                      <ShieldIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {program.learning_support.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {program.learning_support.features.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-border text-sm text-muted-foreground">
                  <span className="text-primary">&gt; </span>
                  {program.study_plan.description}
                </div>
              </CardContent>

              <CardFooter className="px-5 py-4 border-t border-border">
                <Link href={`/programs/${program.id}`} className="w-full">
                  {/* <Button className="w-full">
                    View Plan Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button> */}
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPrograms;
