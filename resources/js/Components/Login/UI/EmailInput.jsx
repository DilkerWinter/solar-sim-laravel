import { Mail } from "lucide-react";

export default function EmailInput({ email, setEmail }) {
  return (
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <input
          id="email"
          type="email"
          placeholder="Digite seu email"
          className="w-full pl-12 py-2 rounded-2xl border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-0 text-gray-500 placeholder-gray-500 transition-colors duration-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
      </div>
    </div>
  );
}
