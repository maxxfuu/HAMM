interface MeetingDataPageProps {
  params: {
    id: string;
  };
}

export default function MeetingDataPage({ params }: MeetingDataPageProps) {
  return (
    <div>
      <p>Meeting data page</p>
      <p>Meeting id: {params.id}</p>
    </div>
  );
}
