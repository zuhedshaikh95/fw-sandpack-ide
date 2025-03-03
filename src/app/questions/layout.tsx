type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function QuestionLayout({ children }: Props) {
  return (
    <main className="h-screen flex flex-col">
      {children}

      <div className="p-3 h-10 flex justify-center items-center">
        <p>Footer</p>
      </div>
    </main>
  );
}
