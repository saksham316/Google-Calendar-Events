import { useAuth } from "../../../../hooks/authHook";
import { SignIn } from "../../../../modules/auth/components";
import { EventCalendar } from "../../../../modules/calendar/components";

const ProtectedRoutesLayout = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <EventCalendar /> : <SignIn />;
};

export { ProtectedRoutesLayout };
