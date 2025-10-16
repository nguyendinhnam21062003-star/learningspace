import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { GridCourse } from "@/components/grid-course";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { FeaturedTutors } from "@/components/featured-tutors";
import data from "./data.json";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="  px-4 lg:px-6  mx-auto w-full ">
                <GridCourse />
              </div>
              <div className="px-4 lg:px-6">
                <FeaturedTutors />
              </div>

              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
