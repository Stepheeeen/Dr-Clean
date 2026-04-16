import { PublicLayout } from '@/components/layouts/PublicLayout'

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    startTransition(() => {
      initiatePasswordReset(values).then((data) => {
        if (data?.error) {
          toast.error(data.error)
        }
        if (data?.success) {
          toast.success(data.success)
          setIsSubmitted(true)
        }
      })
    })
  }

  return (
    <PublicLayout>
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-12 bg-background relative overflow-hidden py-32">
        {/* Background Accent */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="w-full max-w-lg bg-background border border-foreground p-12 lg:p-20 relative z-10 animate-in fade-in zoom-in duration-700">
          <header className="mb-16">
            <Link 
              href="/login" 
              className="inline-flex items-center text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-12 hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-4 group-hover:-translate-x-2 transition-transform" />
              Retreat to Login
            </Link>
            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6">Security Recovery</h2>
            <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase leading-none">
              LOST <br /><span className="font-light italic text-primary">ACCESS</span>.
            </h1>
            <p className="mt-8 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic leading-relaxed">
              Initiate the protocol to restore your credentials.
            </p>
          </header>

          {isSubmitted ? (
            <div className="text-center py-20 bg-secondary/20 border border-border">
              <div className="w-20 h-20 border border-primary flex items-center justify-center mx-auto mb-10">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground mb-4">Transmission Successful</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-12 italic">
                A restoration link has been dispatched to your digital coordinate.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-[10px] font-black text-primary border-b border-primary pb-1 uppercase tracking-[0.3em] hover:text-foreground hover:border-foreground transition-all"
              >
                Retry Dispatch
              </button>
            </div>
          ) : (
            <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4 group">
                <label htmlFor="email" className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] group-focus-within:text-primary transition-colors">
                  Digital Coordinate
                </label>
                <div className="relative">
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    autoComplete="email"
                    disabled={isPending}
                    placeholder="ENTER REGISTERED EMAIL"
                    className="w-full bg-transparent border-b border-border py-4 text-sm font-black text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground transition-all uppercase tracking-widest"
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest italic">{errors.email.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-foreground text-background py-6 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-primary hover:text-white transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-4 group"
              >
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Initiate Recovery
                    <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}
  )
}
