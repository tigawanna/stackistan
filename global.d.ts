import { TypedPocketBase } from "typed-pocketbase";
import { Schema } from "src/lib/pb/db-types";
import { PocketBaseClient } from "@/lib/pb/client";

declare module "rakkasjs" {
  interface PageLocals {
    pb: PocketBaseClient
  }
  interface ServerSideLocals {
    pb: TPocketBaseClient;
  }
}


