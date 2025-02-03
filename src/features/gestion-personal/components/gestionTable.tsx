import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePersonalStore } from "../store/personalStore";
import { Button } from "@/components/ui";
import { PaginationPersonal } from "./Pagination";

export const GestionTable = () => {
  const personal = usePersonalStore((state) => state.personal);
  const { page, totalPages, nextPage, previousPage, goPage } = usePersonalStore(
    (state) => state
  );

  // const EliminarPersonal = (personal: User) => {
  //   setOnePersonal(personal);
  //   showModal();
  // };

  return (
    <Table
      className="w-full bg-white rounded-lg overflow-hidden shadow-lg px-8"
      content="w-full"
      color="bg-white"
    >
      <TableCaption>Listado de personal de la Fundacion</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Nombre de Usuario</TableHead>
          <TableHead>Correo Electronico</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead className="">Rol</TableHead>
          <TableHead className="">Estado</TableHead>
          <TableHead className="text-center">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {personal.map((user) => (
          <TableRow key={user.username}>
            <TableCell className="">{user.username}</TableCell>
            <TableCell className="font-medium">{user.email}</TableCell>
            <TableCell>
              {user.userInformation.firstName} {user.userInformation.lastName}
            </TableCell>
            <TableCell>
              {user.userRoles.map((role) => role.role.name).join(", ")}
            </TableCell>
            <TableCell className="text-right">
              {user.isActive ? (
                <span className="text-green-500 text-start">Activo</span>
              ) : (
                <span className="text-red-500 text-start">Inactivo</span>
              )}
            </TableCell>
            <TableCell className="text-right flex gap-3 justify-between">
              <Button variant="destructive">Eliminar</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>
            <PaginationPersonal
              currentPage={page}
              goToPage={(page) => goPage(page)}
              totalPages={totalPages}
              nextPage={nextPage}
              previousPage={previousPage}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
