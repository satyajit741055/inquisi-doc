import serverAuthService from '@/appwrite/server-auth';
import { initTRPC, TRPCError } from '@trpc/server';
 
// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.create();
 const middleware = t.middleware
const isAuth = middleware(async (opts) => {
  const user = await serverAuthService.getCurrentUser()


  if (!user || !user.$id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return opts.next({
    ctx: {
      userId: user.$id,
      user,
    },
  })
})
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth)