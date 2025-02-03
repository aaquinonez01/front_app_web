import { menuSidemar } from "@/config/types/menuSidebar.types";
import {
  Calendar,
  ClipboardMinus,
  Home,
  ListChecksIcon,
  Users,
} from "lucide-react";

export const menuSidebar: menuSidemar[] = [
  {
    name: "Inicio",
    href: "/",
    icon: <Home className="mr-2 h-5 w-5" />,
  },
  {
    name: "Historias Clínicas",
    href: "/historias-clinicas",
    icon: <ClipboardMinus className="mr-2 h-5 w-5" />,
  },
  {
    name: "Gestion de Personal",
    href: "/gestion-personal",
    icon: <Users className="mr-2 h-5 w-5" />,
  },
  {
    name: "Calendario",
    href: "/calendario",
    icon: <Calendar className="mr-2 h-5 w-5" />,
  },
  {
    name: "Listado de Pacientes",
    href: "/listado-pacientes",
    icon: <ListChecksIcon className="mr-2 h-5 w-5" />,
  },
];
