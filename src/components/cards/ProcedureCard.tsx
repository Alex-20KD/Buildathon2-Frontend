import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import type { Procedure } from "@/types";
import { getIcon } from "@/utils/getIcon";
import { Button } from "@/components/ui";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ProcedureCard({ procedure }: { procedure: Procedure }) {
  const Icon = useMemo(() => getIcon(procedure.icon), [procedure.icon]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <span className="flex h-12 w-12 items-center justify-center rounded-app bg-primary-light text-primary">
          <Icon className="h-6 w-6" />
        </span>
        <Badge variant="primary">{procedure.category}</Badge>
      </CardHeader>

      <CardTitle>{procedure.name}</CardTitle>
      <CardContent className="mt-2 flex-1">
        <p className="line-clamp-3 text-text-muted">{procedure.description}</p>
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-text-muted">
          <Clock className="h-3.5 w-3.5" />
          {procedure.estimatedTime}
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-3">
        <Link to={`/tramites/${procedure.slug}`} className="w-full">
          <Button variant="secondary" size="sm" className="w-full">
            Ver información
          </Button>
        </Link>
        <Link to={`/tramites/${procedure.slug}`} className="w-full">
          <Button size="sm" className="w-full">
            Iniciar trámite
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
