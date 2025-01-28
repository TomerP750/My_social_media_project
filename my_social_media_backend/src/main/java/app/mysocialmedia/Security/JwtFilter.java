package app.mysocialmedia.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Order(2)
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private SessionManager sessionManager;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException, IOException {
        try {
            String token = request.getHeader("Authorization").replace("Bearer ", "");
            if(sessionManager.checkIfKeyExists(token)&&!sessionManager.checkIfSessionExpired(token)) {
                filterChain.doFilter(request, response);
            }else {
                response.setStatus(401);
                response.getWriter().write("Unauthorized, please log in!");
            }
        }catch (Exception e){
            response.setStatus(401);
            response.getWriter().write("Unauthorized, please log in!");
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request)  {
        return request.getServletPath().startsWith("/auth") || request.getServletPath().startsWith("/feed") ||
        request.getServletPath().startsWith("/");
    }
}