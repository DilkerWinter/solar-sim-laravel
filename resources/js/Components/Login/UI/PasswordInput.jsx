import { Lock, Eye, EyeOff } from "lucide-react";

export default function LoginInput({ password, setPassword, showPassword, setShowPassword }) {
  return (
    <div className="space-y-2">
      <label htmlFor="password" className="text-sm font-medium">
        Senha
      </label>
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Digite sua senha"
          className="w-full pl-12 pr-12 py-2 rounded-2xl border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-0 text-gray-500 placeholder-gray-500 transition-colors duration-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
        >
          {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
