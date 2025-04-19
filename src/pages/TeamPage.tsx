import { useParams, A } from '@solidjs/router';

const TeamPage = () => {
  const params = useParams();
  
  // Lista członków zespołu
  const teamMembers = [
    { id: "1", name: "Jan Kowalski", position: "CEO" },
    { id: "2", name: "Anna Nowak", position: "CTO" },
    { id: "3", name: "Piotr Wiśniewski", position: "Project Manager" },
    { id: "4", name: "Katarzyna Zielińska", position: "UX Designer" },
    { id: "5", name: "Michał Szymański", position: "Full-Stack Developer" }
  ];

  // Jeśli podano memberId, znajdź członka zespołu
  const selectedMember = params.memberId 
    ? teamMembers.find(member => member.id === params.memberId) 
    : null;

  return (
    <div style="padding: 20px;">
      <h1>Nasz zespół</h1>
      <p>To jest przykład strony z opcjonalnym parametrem <code>:memberId?</code>.</p>
      <p>Ścieżka <code>/team</code> oraz <code>/team/123</code> obsługiwane są przez ten sam komponent.</p>
      
      {selectedMember ? (
        <div style="margin-top: 20px;">
          <h2>Profil członka zespołu</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>ID:</strong> {selectedMember.id}</p>
            <p><strong>Imię i nazwisko:</strong> {selectedMember.name}</p>
            <p><strong>Stanowisko:</strong> {selectedMember.position}</p>
          </div>
          <p style="margin-top: 10px;">
            <A href="/team" style="color: #4a6fa5; text-decoration: underline;">
              Powrót do listy zespołu
            </A>
          </p>
        </div>
      ) : (
        <div style="margin-top: 20px;">
          <h2>Lista członków zespołu</h2>
          <ul style="list-style-type: none; padding: 0;">
            {teamMembers.map(member => (
              <li style="margin-bottom: 10px; padding: 10px; border: 1px solid #e0e0e0; border-radius: 4px;">
                <p><strong>{member.name}</strong> - {member.position}</p>
                <A 
                  href={`/team/${member.id}`}
                  style="color: #4a6fa5; text-decoration: underline;"
                >
                  Zobacz profil
                </A>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamPage; 