import PostgresLogo from "@/assets/postgres.svg";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import { useChainId, useReadContract, useWriteContract } from "wagmi";
import { getContracts } from "./config/contracts.config";

import { abi as tokenAbi } from "./../contracts/Token.sol/DDMTOKEN.json";
import { abi as ddmeshMarketAbi } from "./../contracts/DDMeshMarket.sol/DDMeshMarket.json";

import { ToastAction } from "@/components/ui/toast";

import { parseEther } from "viem";

import { useToast } from "@/components/ui/use-toast";

import { flexRender, useReactTable } from "@tanstack/react-table";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  VisibilityState,
} from "@tanstack/table-core";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ddMeshLogo from "@/assets/ddmesh-logo.svg";
import { DDMToUsdFee, Provider } from "@/common.tsx";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";

import { formatEther } from "viem";

const CenterAlignedHeader: FC<{ header: string }> = ({ header }) => (
  <div className="capitalize text-center">{header}</div>
);

export const AgreementOnboarding = () => {
  const { toast } = useToast();
  const [providerChoice, setProviderChoice] = useState<bigint>(BigInt(0));

  const chainId = useChainId();

  const tokenAddress = getContracts(chainId).token as `0x${string}`;
  const ddmeshMarketAddress = getContracts(chainId)
    .ddmeshMarket as `0x${string}`;
  console.log("ddmeshMarketAddress", ddmeshMarketAddress);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Provider>[] = [
    {
      accessorKey: "storagePrice",
      header: () => {
        return <CenterAlignedHeader header="Storage Price" />;
      },
      cell: ({ row }: any) => {
        return (
          <div className={"flex-col items-middle"}>
            <p className={"text-lg flex"}>
              {DDMToUsdFee(Number(formatEther(row.original?.fee?.toString())))}{" "}
              /space $/s
            </p>
            <div className={"flex items-center space-x-1"}>
              <img className={"h-5"} src={ddMeshLogo} />
              <p className={"text-lg flex"}>
                {formatEther(row.original?.fee?.toString())?.toString()} DMM/s
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "dataProvider",
      header: () => {
        return <CenterAlignedHeader header="Data Provider" />;
      },
      cell: () => (
        <div className={"flex items-middle justify-center"}>
          <img style={{ height: 50 }} src={PostgresLogo} />
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: () => {
        return <CenterAlignedHeader header="Name" />;
      },
      cell: ({ row }: any) => (
        <div className="capitalize">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "tvl",
      header: () => {
        return <CenterAlignedHeader header="TVL" />;
      },
      cell: ({ row }: any) => (
        <div className="capitalize">{row.getValue("tvl")}</div>
      ),
    },
    {
      accessorKey: "button",
      header: () => {
        return <CenterAlignedHeader header="Deploy" />;
      },
      cell: ({ row }: any) => (
        <div>
          <Button
            onClick={() => {
              console.log("row", row?.original.id);
              setProviderChoice(row?.original.id);
              onDeploy();
            }}
          >
            Deploy
          </Button>
        </div>
      ),
    },
  ];

  const {
    isPending: isPendingApprove,
    writeContract: writeContractApprove,
    isSuccess: isApproveSuccess,
  } = useWriteContract();

  const {
    writeContract: writeContractEnterAgreement,
    isSuccess: isEnterAgreementSuccess,
    isError: isEnterAgreementError,
    error: enterAgreementError,
  } = useWriteContract();

  const onDeploy = async () => {
    //@ts-ignore
    writeContractApprove({
      address: tokenAddress,
      abi: tokenAbi,
      functionName: "approve",
      args: [ddmeshMarketAddress, parseEther("50")],
    });
  };

  useEffect(() => {
    if (isEnterAgreementError) {
      console.log("enterAgreementError", enterAgreementError);
    }
  }, [isEnterAgreementError]);

  useEffect(() => {
    if (
      isApproveSuccess &&
      !isPendingApprove &&
      !isEnterAgreementError &&
      !isEnterAgreementSuccess
    ) {
      console.log(
        "Approve success, entering agreement now. providerChoice: ",
        providerChoice
      );
      writeContractEnterAgreement({
        address: ddmeshMarketAddress,
        abi: ddmeshMarketAbi,
        functionName: "enterAgreement",
        args: [providerChoice, parseEther("50")],
      });
    }
  }, [isApproveSuccess]);

  // as soon as isEnterAgreementSuccess is true, we show a success message to the user
  useEffect(() => {
    if (isEnterAgreementSuccess && !isEnterAgreementError) {
      console.log("Successfully entered agreement and paid");
      toast({
        title: "SuccessFully Paid For Agreement",
        description: "Friday, February 10, 2023 at 5:57 PM",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }
  }, [isEnterAgreementSuccess]);

  const { data: providers } = useReadContract({
    address: ddmeshMarketAddress,
    abi: ddmeshMarketAbi,
    functionName: "getAllProviders",
    args: [],
  });
  const { data: tvls } = useReadContract({
    address: ddmeshMarketAddress,
    abi: ddmeshMarketAbi,
    functionName: "getProviderTVLs",
    args: [],
  });

  useEffect(() => {
    console.log("useEffect providers", providers);
  }, [providers]);
  console.log("chainId", chainId);
  console.log("abi", ddmeshMarketAbi);

  const table = useReactTable({
    data: (providers as Provider[]) || [],
    //@ts-ignore
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  console.log("providers", providers);
  console.log("tvl", tvls);

  return (
    <>
      <p className="leading-7 [&:not(:first-child)]:mt-6 mb-4text-2xl">
        Get a database
      </p>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="[&:has([role=checkbox])]:pl-3"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="[&:has([role=checkbox])]:pl-3"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/*<div className="flex items-center justify-end space-x-2 pt-4">*/}
        {/*  <div className="flex-1 text-sm text-muted-foreground">*/}
        {/*    <Button*/}
        {/*      variant="outline"*/}
        {/*      size="sm"*/}
        {/*      onClick={() => table.previousPage()}*/}
        {/*      disabled={!table.getCanPreviousPage()}*/}
        {/*    >*/}
        {/*      Previous*/}
        {/*    </Button>*/}
        {/*    <Button*/}
        {/*      variant="outline"*/}
        {/*      size="sm"*/}
        {/*      onClick={() => table.nextPage()}*/}
        {/*      disabled={!table.getCanNextPage()}*/}
        {/*    >*/}
        {/*      Next*/}
        {/*    </Button>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};
