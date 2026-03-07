export default function Community() {
  return (
    <section className="py-32 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-16 items-center">
          {/* Image/Visual Column */}
          <div className="col-span-12 lg:col-span-6 relative">
            <div className="aspect-square bg-slate-100 dark:bg-slate-900 relative overflow-hidden swiss-border">
              {/* Note: Standard img used. Switch to next/image for production if self-hosting assets */}
              <img
                alt="Mentorship session"
                className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply dark:mix-blend-luminosity dark:opacity-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8IhZUp8QdHReeKLhrJLC22cZkGux73GV9mW0BR-4fG7Z8buEPt5Wd4awrNMjfs5eMfzMsEolfe_FSZrU0SqHGgjcCHw1uockPpg9Fp4C3HxImgFfMQTngK1b4imUiktHH2vV-3kHnoW57R1j7yXYw3q-p8o2_vk9m3-upxwGL4pYDP9w0sE_HUE0ngcaZ75MGlHUONP_wgvpIZvnQw38RmbwdJNeLMI_esOuyqhRZ8hxJdSfXY17ca_WczwErZMwjO9_JoCu5zD0"
              />
              <div className="absolute inset-0 bg-primary/10"></div>
            </div>

            {/* Stat Accent Box */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary p-8 hidden md:flex flex-col justify-end shadow-2xl dark:shadow-none">
              <span className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                20+
              </span>
              <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                Active Mentors
              </span>
            </div>
          </div>

          {/* Content Column */}
          <div className="col-span-12 lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6 block">
              Community & Mentorship
            </span>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-none text-slate-900 dark:text-slate-100">
              Investing in the <br /> Human Protocol.
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 text-justify-custom">
              We believe the future of software infrastructure is built on open
              collaboration. Our lab actively sponsors Open Source Software
              (OSS) projects and provides rigorous mentorship for graduate
              students and developers pushing the boundaries of what is possible
              in core computing.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-12">
              {/* <div>
                <h5 className="text-xs font-bold uppercase tracking-widest mb-2 text-slate-900 dark:text-slate-100">
                  Fellowships
                </h5>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Fully-funded research positions for PhD candidates and
                  post-docs.
                </p>
              </div> */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-widest mb-2 text-slate-900 dark:text-slate-100">
                  OSS Grants
                </h5>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Infrastructure and engineering support for critical low-level
                  libraries.
                </p>
              </div>
            </div>

            <button className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-primary dark:hover:bg-primary hover:text-slate-900 transition-all cursor-pointer">
              Join the Community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
