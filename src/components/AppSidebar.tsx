import { Link, useLocation } from "react-router-dom";
import { MapPin, LayoutDashboard, PlusCircle, ClipboardList, Users, BarChart3, Settings, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";

const citizenNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Crear incidencia", url: "/crear-incidencia", icon: PlusCircle },
];

const officialNav = [
  { title: "Panel Funcionario", url: "/funcionario", icon: ClipboardList },
];

const adminNav = [
  { title: "Panel Admin", url: "/admin", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const linkClass = (url: string) =>
    `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
      location.pathname === url
        ? "bg-primary/10 text-primary font-medium"
        : "text-muted-foreground hover:bg-accent hover:text-foreground"
    }`;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="flex h-16 items-center gap-2 px-4 border-b">
          <MapPin className="h-5 w-5 text-primary shrink-0" />
          {!collapsed && <span className="font-bold text-foreground">CiudadReporta</span>}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Ciudadano</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {citizenNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className={linkClass(item.url)}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Funcionario</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {officialNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className={linkClass(item.url)}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Administrador</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className={linkClass(item.url)}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-3">
        <Link to="/" className={linkClass("")}>
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Cerrar sesión</span>}
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
