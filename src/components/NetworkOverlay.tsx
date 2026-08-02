import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Lock, MousePointer, Trash2 } from "lucide-react";

/**
 * Interface representing a user-added proxy hop node along the network path.
 */
export interface HopNode {
  id: string;
  x: number;
  y: number;
  label: string;
}

/**
 * Interface representing HTTP status response codes and theme colors.
 */
export interface HttpStatusInfo {
  code: number;
  text: string;
  category: "2xx" | "3xx" | "4xx" | "5xx";
  color: string;
  bgColor: string;
}

const HTTP_STATUS_200: HttpStatusInfo = {
  code: 200,
  text: "200 OK",
  category: "2xx",
  color: "#22c55e",
  bgColor: "rgba(34, 197, 94, 0.15)",
};
const HTTP_STATUS_201: HttpStatusInfo = {
  code: 201,
  text: "201 Created",
  category: "2xx",
  color: "#22c55e",
  bgColor: "rgba(34, 197, 94, 0.15)",
};
const HTTP_STATUS_301: HttpStatusInfo = {
  code: 301,
  text: "301 Moved",
  category: "3xx",
  color: "#f59e0b",
  bgColor: "rgba(245, 158, 11, 0.15)",
};
const HTTP_STATUS_304: HttpStatusInfo = {
  code: 304,
  text: "304 Not Modified",
  category: "3xx",
  color: "#f59e0b",
  bgColor: "rgba(245, 158, 11, 0.15)",
};
const HTTP_STATUS_400: HttpStatusInfo = {
  code: 400,
  text: "400 Bad Request",
  category: "4xx",
  color: "#ef4444",
  bgColor: "rgba(239, 68, 68, 0.15)",
};
const HTTP_STATUS_401: HttpStatusInfo = {
  code: 401,
  text: "401 Unauthorized",
  category: "4xx",
  color: "#ef4444",
  bgColor: "rgba(239, 68, 68, 0.15)",
};
const HTTP_STATUS_500: HttpStatusInfo = {
  code: 500,
  text: "500 Server Error",
  category: "5xx",
  color: "#ef4444",
  bgColor: "rgba(239, 68, 68, 0.15)",
};

/**
 * Interface representing a portfolio-themed HTTP API endpoint request with method color coding.
 */
export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  color: string;
  bgColor: string;
  validResponses: HttpStatusInfo[];
}

const PORTFOLIO_API_ENDPOINTS: ApiEndpoint[] = [
  {
    method: "GET",
    path: "/api/v1/projects",
    color: "#3b82f6", // Blue for GET
    bgColor: "rgba(59, 130, 246, 0.15)",
    validResponses: [HTTP_STATUS_200, HTTP_STATUS_304],
  },
  {
    method: "POST",
    path: "/api/v1/contact",
    color: "#22c55e", // Green for POST
    bgColor: "rgba(34, 197, 94, 0.15)",
    validResponses: [HTTP_STATUS_201, HTTP_STATUS_400],
  },
  {
    method: "GET",
    path: "/api/v1/about/skills",
    color: "#3b82f6", // Blue for GET
    bgColor: "rgba(59, 130, 246, 0.15)",
    validResponses: [HTTP_STATUS_200, HTTP_STATUS_304],
  },
  {
    method: "GET",
    path: "/api/v1/resume/pdf",
    color: "#3b82f6", // Blue for GET
    bgColor: "rgba(59, 130, 246, 0.15)",
    validResponses: [HTTP_STATUS_200, HTTP_STATUS_301],
  },
  {
    method: "POST",
    path: "/api/v1/auth/login",
    color: "#22c55e", // Green for POST
    bgColor: "rgba(34, 197, 94, 0.15)",
    validResponses: [HTTP_STATUS_200, HTTP_STATUS_401],
  },
  {
    method: "POST",
    path: "/api/v1/gateway/proxy",
    color: "#f59e0b", // Amber for Gateway POST
    bgColor: "rgba(245, 158, 11, 0.15)",
    validResponses: [HTTP_STATUS_200, HTTP_STATUS_500],
  },
];

// Top navbar height boundary in pixels
const TOP_BAR_HEIGHT = 75;

// Constant packet speed in pixels per second
const PACKET_SPEED_PX_PER_SEC = 480;

// Minimum distance squared (in px) to prevent placing a node directly on top of another node (20px radius)
const MIN_NODE_COLLISION_SQ = 20 * 20;

/**
 * Calculates squared distance from point (px, py) to line segment (ax, ay)-(bx, by).
 */
function distToSegmentSquared(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) {
    const dpx = px - ax;
    const dpy = py - ay;
    return dpx * dpx + dpy * dpy;
  }
  let t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  const qx = ax + t * dx;
  const qy = ay + t * dy;
  const diffX = px - qx;
  const diffY = py - qy;
  return diffX * diffX + diffY * diffY;
}

/**
 * NetworkOverlay Component
 *
 * Simulates real-time HTTP Request & Response packet flow between Client (you),
 * customizable intermediate Proxy nodes, and a fixed Origin Server.
 */
export default function NetworkOverlay() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  // Toggle for mouse tracking (default: false, client rests at locked position)
  const [isTrackingMouse, setIsTrackingMouse] = useState<boolean>(false);
  const isTrackingMouseRef = useRef(isTrackingMouse);

  useEffect(() => {
    isTrackingMouseRef.current = isTrackingMouse;
  }, [isTrackingMouse]);

  // Intermediate Proxy nodes added by clicking
  const [hops, setHops] = useState<HopNode[]>([]);
  const hopsRef = useRef<HopNode[]>([]);

  // Unique auto-incrementing counter for proxy labels to prevent duplicate numbers
  const nextProxyIdRef = useRef<number>(1);

  useEffect(() => {
    hopsRef.current = hops;
  }, [hops]);

  // Helper to clear all proxies & reset unique proxy ID counter
  const handleClearAllProxies = useCallback(() => {
    setHops([]);
    nextProxyIdRef.current = 1;
  }, []);

  // Fixed Server Node coordinates (bottom-right of Hero section)
  const [serverPos, setServerPos] = useState<{ x: number; y: number }>({
    x: 850,
    y: 520,
  });
  const serverPosRef = useRef<{ x: number; y: number }>(serverPos);

  useEffect(() => {
    serverPosRef.current = serverPos;
  }, [serverPos]);

  // Motion values for Client node position (default: bottom-left)
  const rawMouseX = useMotionValue(200);
  const rawMouseY = useMotionValue(520);

  // Smooth spring physics lag for the Client node
  const smoothX = useSpring(rawMouseX, { stiffness: 140, damping: 22 });
  const smoothY = useSpring(rawMouseY, { stiffness: 140, damping: 22 });

  // Motion values for the animated packet dot position
  const packetX = useMotionValue(-100);
  const packetY = useMotionValue(-100);
  const packetOpacity = useMotionValue(0);
  const packetColor = useMotionValue("#3b82f6");

  // Active HTTP Request badge at client node
  const [activeRequest, setActiveRequest] = useState<ApiEndpoint | null>(null);

  // Active HTTP Status badge at server node
  const [activeStatus, setActiveStatus] = useState<HttpStatusInfo | null>(null);

  // Helper to recalculate and mutate the SVG path string: Client -> Proxies -> Server
  const updateSvgPath = useCallback(() => {
    if (!pathRef.current) return;

    const currentYouX = smoothX.get();
    const currentYouY = smoothY.get();
    const currentServer = serverPosRef.current;
    const currentHops = hopsRef.current;

    let d = `M ${currentYouX} ${currentYouY}`;
    currentHops.forEach((hop) => {
      d += ` L ${hop.x} ${hop.y}`;
    });
    d += ` L ${currentServer.x} ${currentServer.y}`;

    pathRef.current.setAttribute("d", d);
  }, [smoothX, smoothY]);

  // Redraw SVG path immediately whenever hops array changes (ensures unattached additions update line instantly)
  useEffect(() => {
    if (isMobile) return;
    updateSvgPath();
  }, [hops, updateSvgPath, isMobile]);

  // Calculate default node layout positions on mount & resize (Server: bottom-right, Client: bottom-left, horizontally aligned)
  useEffect(() => {
    if (isMobile) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();

        // Fixed Server position (Bottom Right)
        const serverX = Math.max(rect.width * 0.82, rect.width - 220);
        const serverY = Math.min(rect.height * 0.74, rect.height - 130);
        setServerPos({ x: serverX, y: serverY });

        // Fixed initial Client position (Bottom Left, horizontally aligned with serverY)
        const defaultClientX = Math.max(rect.width * 0.18, 160);
        const defaultClientY = serverY;

        if (!isTrackingMouseRef.current) {
          rawMouseX.set(defaultClientX);
          rawMouseY.set(defaultClientY);
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [isMobile, rawMouseX, rawMouseY]);

  // Redraw SVG path when smooth spring coordinates update
  useEffect(() => {
    if (isMobile) return;

    let rafId: number | null = null;
    const handleMotionChange = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateSvgPath();
          rafId = null;
        });
      }
    };

    const unsubscribeX = smoothX.on("change", handleMotionChange);
    const unsubscribeY = smoothY.on("change", handleMotionChange);

    updateSvgPath();

    return () => {
      unsubscribeX();
      unsubscribeY();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [smoothX, smoothY, updateSvgPath, isMobile]);

  // Global mouse tracking when enabled (with Top Bar & Hero Text Card perimeter collision avoidance)
  useEffect(() => {
    if (isMobile || !isTrackingMouse) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      if (relX >= 0 && relX <= rect.width && relY >= 0 && relY <= rect.height) {
        let finalX = relX;
        let finalY = Math.max(relY, TOP_BAR_HEIGHT);

        // 1. Perimeter avoidance for Top Control Bar Elements ([data-top-control-bar])
        const topBarEl = containerRef.current.parentElement?.querySelector(
          "[data-top-control-bar]",
        ) as HTMLElement | null;

        if (topBarEl) {
          const barRect = topBarEl.getBoundingClientRect();
          const barLeft = barRect.left - rect.left;
          const barRight = barRect.right - rect.left;
          const barTop = barRect.top - rect.top;
          const barBottom = barRect.bottom - rect.top;

          const pad = 16;

          if (
            finalX >= barLeft - pad &&
            finalX <= barRight + pad &&
            finalY >= barTop - pad &&
            finalY <= barBottom + pad
          ) {
            finalY = barBottom + pad;
          }
        }

        // 2. Perimeter avoidance for Hero Text Card ([data-hero-text-card])
        const textBoxEl = containerRef.current.parentElement?.querySelector(
          "[data-hero-text-card]",
        ) as HTMLElement | null;

        if (textBoxEl) {
          const boxRect = textBoxEl.getBoundingClientRect();
          const bLeft = boxRect.left - rect.left;
          const bRight = boxRect.right - rect.left;
          const bTop = boxRect.top - rect.top;
          const bBottom = boxRect.bottom - rect.top;

          const pad = 20;

          if (
            finalX >= bLeft - pad &&
            finalX <= bRight + pad &&
            finalY >= bTop - pad &&
            finalY <= bBottom + pad
          ) {
            const dLeft = Math.abs(finalX - (bLeft - pad));
            const dRight = Math.abs(bRight + pad - finalX);
            const dTop = Math.abs(finalY - (bTop - pad));
            const dBottom = Math.abs(bBottom + pad - finalY);
            const minD = Math.min(dLeft, dRight, dTop, dBottom);

            if (minD === dLeft) finalX = bLeft - pad;
            else if (minD === dRight) finalX = bRight + pad;
            else if (minD === dTop)
              finalY = Math.max(bTop - pad, TOP_BAR_HEIGHT);
            else finalY = bBottom + pad;
          }
        }

        rawMouseX.set(finalX);
        rawMouseY.set(finalY);
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [isMobile, isTrackingMouse, rawMouseX, rawMouseY]);

  // Toggle cursor tracking on/off (locks client node right at current mouse position)
  const handleToggleTracking = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setIsTrackingMouse((prev) => {
        const nextState = !prev;
        if (!nextState) {
          // Lock client node exactly at current mouse position
          rawMouseX.set(smoothX.get());
          rawMouseY.set(smoothY.get());
        }
        return nextState;
      });
    },
    [rawMouseX, rawMouseY, smoothX, smoothY],
  );

  // Keyboard shortcut listener: Space/Esc/C to toggle tracking, X to clear all proxies
  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keypresses if typing inside an interactive form input
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.isContentEditable)
      ) {
        return;
      }

      const keyLower = e.key.toLowerCase();

      // Space, Escape, or C toggles cursor tracking (locks at current position)
      if (e.key === " " || e.key === "Escape" || keyLower === "c") {
        if (e.key === " ") {
          e.preventDefault();
        }
        handleToggleTracking();
      }
      // X key clears all proxies
      else if (keyLower === "x") {
        handleClearAllProxies();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobile, handleToggleTracking, handleClearAllProxies]);

  // Click Listener on Hero Section to add Proxy hop nodes into nearest path segment
  useEffect(() => {
    if (isMobile) return;

    const handleHeroClick = (e: MouseEvent) => {
      if (!containerRef.current) return;

      if (e.button !== 0) return;

      const rect = containerRef.current.getBoundingClientRect();

      if (e.clientY < rect.top + TOP_BAR_HEIGHT) {
        return;
      }

      const target = e.target as HTMLElement | null;

      // Guard: ignore clicks inside text box, proxy nodes, client node, or control buttons/banners
      if (
        target &&
        (target.closest("[data-no-hop]") ||
          target.closest("[data-hero-text-card]") ||
          target.closest("[data-proxy-node]") ||
          target.closest("[data-client-node]") ||
          target.closest("[data-control-button]") ||
          target.closest("[data-top-control-bar]"))
      ) {
        return;
      }

      // Guard: Check bounding box of top control bar area
      const controlBarEl = containerRef.current.querySelector(
        "[data-top-control-bar]",
      ) as HTMLElement | null;

      if (controlBarEl) {
        const barRect = controlBarEl.getBoundingClientRect();
        const pad = 12;
        if (
          e.clientX >= barRect.left - pad &&
          e.clientX <= barRect.right + pad &&
          e.clientY >= barRect.top - pad &&
          e.clientY <= barRect.bottom + pad
        ) {
          return;
        }
      }

      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }

      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;

      // Collision Check: Prevent placing proxy directly on top of Server or existing Proxies (20px radius)
      const serverX = serverPosRef.current.x;
      const serverY = serverPosRef.current.y;

      const dxServer = newX - serverX;
      const dyServer = newY - serverY;
      if (dxServer * dxServer + dyServer * dyServer < MIN_NODE_COLLISION_SQ) {
        return;
      }

      // Check client collision ONLY when client is UNATTACHED (not following cursor)
      if (!isTrackingMouseRef.current) {
        const clientX = smoothX.get();
        const clientY = smoothY.get();
        const dxClient = newX - clientX;
        const dyClient = newY - clientY;
        if (dxClient * dxClient + dyClient * dyClient < MIN_NODE_COLLISION_SQ) {
          return;
        }
      }

      for (const hop of hopsRef.current) {
        const dx = newX - hop.x;
        const dy = newY - hop.y;
        if (dx * dx + dy * dy < MIN_NODE_COLLISION_SQ) {
          return;
        }
      }

      // Generate unique proxy label using auto-incrementing counter
      const proxyNumber = nextProxyIdRef.current++;

      const newHop: HopNode = {
        id: `proxy-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        x: newX,
        y: newY,
        label: `proxy-${proxyNumber}`,
      };

      // Build array of all current path nodes: Client -> Hops -> Server
      const currentClientX = smoothX.get();
      const currentClientY = smoothY.get();

      const allPathNodes = [
        { x: currentClientX, y: currentClientY },
        ...hopsRef.current,
        { x: serverX, y: serverY },
      ];

      // Find closest segment i in allPathNodes
      let bestIndex = 0;
      let minDistanceSq = Infinity;

      for (let i = 0; i < allPathNodes.length - 1; i++) {
        const distSq = distToSegmentSquared(
          newX,
          newY,
          allPathNodes[i].x,
          allPathNodes[i].y,
          allPathNodes[i + 1].x,
          allPathNodes[i + 1].y,
        );
        if (distSq < minDistanceSq) {
          minDistanceSq = distSq;
          bestIndex = i;
        }
      }

      // Insert new hop into hops array at bestIndex
      setHops((prev) => {
        const nextHops = [...prev];
        nextHops.splice(bestIndex, 0, newHop);
        return nextHops;
      });
    };

    const parent = containerRef.current?.parentElement || window;
    parent.addEventListener("click", handleHeroClick as EventListener);
    return () =>
      parent.removeEventListener("click", handleHeroClick as EventListener);
  }, [isMobile, smoothX, smoothY]);

  // Right-click listener to clear all proxy nodes
  useEffect(() => {
    if (isMobile) return;

    const handleContextMenu = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        if (hopsRef.current.length > 0) {
          e.preventDefault();
          handleClearAllProxies();
        }
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    return () => window.removeEventListener("contextmenu", handleContextMenu);
  }, [isMobile, handleClearAllProxies]);

  // Remove specific proxy hop node (Forbid removing proxies if cursor is unattached!)
  const handleRemoveHop = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Forbid removing proxies if cursor is unattached
    if (!isTrackingMouseRef.current) return;

    setHops((prev) => prev.filter((h) => h.id !== id));
  };

  // Continuous Sequential HTTP Request -> Response Packet Simulation Loop
  useEffect(() => {
    if (isMobile) return;

    let isCancelled = false;

    const runSimulationLoop = async () => {
      await new Promise((r) => setTimeout(r, 400));

      while (!isCancelled) {
        if (!pathRef.current) {
          await new Promise((r) => setTimeout(r, 100));
          continue;
        }

        const pathEl = pathRef.current;
        const initialLen = pathEl.getTotalLength();
        if (initialLen === 0) {
          await new Promise((r) => setTimeout(r, 100));
          continue;
        }

        // Position packet dot initially at client position (offset 0)
        try {
          const startPt = pathEl.getPointAtLength(0);
          packetX.set(startPt.x);
          packetY.set(startPt.y);
        } catch {
          // Fallback
        }

        // Select random portfolio API endpoint for client request
        const endpoint =
          PORTFOLIO_API_ENDPOINTS[
            Math.floor(Math.random() * PORTFOLIO_API_ENDPOINTS.length)
          ];
        setActiveRequest(endpoint);

        // ====================================================
        // PHASE 1: HTTP Request Packet (Client -> Proxies -> Server)
        // Color-coded by HTTP method (GET = Blue, POST = Green, etc.)
        // Position is anchored to FIXED Server at liveLen (liveLen - distRemaining)
        // ====================================================
        packetColor.set(endpoint.color);
        packetOpacity.set(1);

        let distRemaining = initialLen;
        let lastTime = performance.now();

        await new Promise<void>((resolve) => {
          const animateRequest = (now: number) => {
            if (isCancelled) return resolve();
            const dt = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;

            distRemaining -= PACKET_SPEED_PX_PER_SEC * dt;

            if (pathRef.current) {
              const liveLen = pathRef.current.getTotalLength();
              if (liveLen > 0) {
                const targetOffset = Math.max(
                  0,
                  liveLen - Math.max(0, distRemaining),
                );
                const pt = pathRef.current.getPointAtLength(targetOffset);
                packetX.set(pt.x);
                packetY.set(pt.y);

                if (distRemaining <= 0) {
                  return resolve();
                }
              }
            }

            requestAnimationFrame(animateRequest);
          };
          requestAnimationFrame(animateRequest);
        });

        if (isCancelled) break;

        // ====================================================
        // PHASE 2: Server Processing & Valid Matching HTTP Status Code Selection
        // ====================================================
        setActiveRequest(null);

        const responseStatus =
          endpoint.validResponses[
            Math.floor(Math.random() * endpoint.validResponses.length)
          ];
        setActiveStatus(responseStatus);
        packetColor.set(responseStatus.color);

        // Server processing pause
        await new Promise((r) => setTimeout(r, 250));

        if (isCancelled) break;

        // ====================================================
        // PHASE 3: HTTP Response Packet (Server -> Proxies -> Client)
        // Position is anchored to FIXED Server at liveLen (liveLen - distFromServer)
        // ====================================================
        let distFromServer = 0;
        lastTime = performance.now();

        await new Promise<void>((resolve) => {
          const animateResponse = (now: number) => {
            if (isCancelled) return resolve();
            const dt = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;

            distFromServer += PACKET_SPEED_PX_PER_SEC * dt;

            if (pathRef.current) {
              const liveLen = pathRef.current.getTotalLength();
              if (liveLen > 0) {
                const targetOffset = Math.max(0, liveLen - distFromServer);
                const pt = pathRef.current.getPointAtLength(targetOffset);
                packetX.set(pt.x);
                packetY.set(pt.y);

                if (distFromServer >= liveLen) {
                  return resolve();
                }
              }
            }

            requestAnimationFrame(animateResponse);
          };
          requestAnimationFrame(animateResponse);
        });

        if (isCancelled) break;

        // ====================================================
        // PHASE 4: Packet Arrival at Client & Long Pause
        // ====================================================
        packetOpacity.set(0);
        setActiveStatus(null);

        // Spaced out pause between packet requests (3.5 seconds)
        await new Promise((r) => setTimeout(r, 3500));
      }
    };

    runSimulationLoop();

    return () => {
      isCancelled = true;
    };
  }, [isMobile, packetX, packetY, packetOpacity, packetColor]);

  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-auto cursor-crosshair select-none"
    >
      {/* SVG Canvas for dashed connection path */}
      <svg className="w-full h-full absolute inset-0 pointer-events-none">
        <path
          ref={pathRef}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="text-primary/30 transition-colors duration-300"
        />
      </svg>

      {/* Unified Top Control Bar: Single Top-Left State Sign + Top-Right Action Button */}
      <div
        data-top-control-bar
        data-no-hop
        className="absolute top-20 left-6 right-6 z-20 flex items-center justify-between pointer-events-none"
      >
        {/* Single Top-Left State Sign */}
        <div className="pointer-events-auto data-no-hop">
          <div className="px-3 py-1.5 rounded-full bg-card/90 border border-border backdrop-blur-md shadow-sm text-[11px] font-mono flex items-center gap-2">
            {isTrackingMouse ? (
              <>
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span className="text-primary font-medium">
                  Cursor Attached &bull; Click to add proxy &bull; Press{" "}
                  <kbd className="px-1 py-0.2 bg-primary/20 border border-primary/40 rounded text-[10px] text-primary font-bold">
                    Space
                  </kbd>{" "}
                  or{" "}
                  <kbd className="px-1 py-0.2 bg-primary/20 border border-primary/40 rounded text-[10px] text-primary font-bold">
                    Esc
                  </kbd>{" "}
                  to lock
                </span>
              </>
            ) : (
              <>
                <Lock className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Cursor Locked &bull; Press{" "}
                  <kbd className="px-1 py-0.2 bg-background border border-border rounded text-[10px] text-foreground font-bold">
                    Space
                  </kbd>{" "}
                  to attach &bull; Press{" "}
                  <kbd className="px-1 py-0.2 bg-background border border-border rounded text-[10px] text-foreground font-bold">
                    X
                  </kbd>{" "}
                  to clear
                </span>
              </>
            )}
          </div>
        </div>

        {/* Top-Right Action Button: Clear (N) Proxies */}
        <div className="flex items-center gap-2 pointer-events-auto data-no-hop flex-nowrap">
          {hops.length > 0 && (
            <button
              data-control-button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClearAllProxies();
              }}
              type="button"
              title="Clear all proxy nodes (Keyboard shortcut: X)"
              className="px-3 py-1.5 rounded-full text-[11px] font-mono font-medium border bg-card/90 text-destructive border-destructive/40 hover:bg-destructive/10 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer select-none whitespace-nowrap"
            >
              <Trash2 className="w-3 h-3 text-destructive" />
              <span>Clear ({hops.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* CLIENT Node — SVG path line attaches directly to dot center at (smoothX, smoothY) */}
      <motion.div
        data-client-node
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className={cn(
          "absolute top-0 left-0 z-10 w-4 h-4 flex items-center justify-center",
          isTrackingMouse
            ? "pointer-events-none"
            : "pointer-events-auto cursor-pointer",
        )}
        onClick={!isTrackingMouse ? handleToggleTracking : undefined}
        title={
          !isTrackingMouse
            ? "Click or press Space to attach client node to cursor"
            : undefined
        }
      >
        {/* Dot Icon (Centered exactly at smoothX, smoothY) */}
        <div
          className={cn(
            "w-4 h-4 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center shadow-[var(--glow-orange)] transition-transform hover:scale-125",
            isTrackingMouse &&
              "ring-2 ring-primary/40 ring-offset-2 ring-offset-background",
          )}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>

        {/* Label & HTTP Request Badge — Positioned absolute below dot */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none whitespace-nowrap">
          <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded bg-card/90 text-primary border border-primary/30 backdrop-blur-xs flex items-center gap-1">
            client
            {isTrackingMouse ? (
              <MousePointer className="w-2.5 h-2.5 text-primary" />
            ) : (
              <Lock className="w-2.5 h-2.5 text-muted-foreground" />
            )}
          </span>
        </div>

        {/* Interactive Callout Badge when Unattached */}
        {!isTrackingMouse && !activeRequest && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: [0, -3, 0] }}
            transition={{
              y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-primary/20 text-primary border border-primary/50 backdrop-blur-xs shadow-md whitespace-nowrap flex items-center gap-1 cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            <span>press me!</span>
          </motion.div>
        )}

        {/* Active Client HTTP Request Badge Popup — Positioned absolute above dot */}
        {activeRequest && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: -4, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-mono font-bold rounded border shadow-md whitespace-nowrap"
            style={{
              color: activeRequest.color,
              backgroundColor: activeRequest.bgColor,
              borderColor: activeRequest.color,
            }}
          >
            <span className="font-extrabold mr-1">{activeRequest.method}</span>
            <span className="text-foreground">{activeRequest.path}</span>
          </motion.div>
        )}
      </motion.div>

      {/* PROXY Nodes — SVG path line attaches directly to dot center at (hop.x, hop.y) */}
      {hops.map((hop) => (
        <div
          key={hop.id}
          data-proxy-node
          style={{
            left: `${hop.x}px`,
            top: `${hop.y}px`,
            transform: "translate(-50%, -50%)",
          }}
          onClick={(e) => handleRemoveHop(hop.id, e)}
          title={
            isTrackingMouse
              ? "Click to remove proxy node"
              : "Attach cursor (Space) to modify proxies"
          }
          className={cn(
            "absolute z-30 w-4 h-4 flex items-center justify-center group",
            isTrackingMouse
              ? "cursor-pointer pointer-events-auto"
              : "cursor-not-allowed pointer-events-auto",
          )}
        >
          {/* Dot Icon (Centered exactly at hop.x, hop.y) */}
          <div
            className={cn(
              "w-3.5 h-3.5 rounded-full bg-card border border-primary flex items-center justify-center shadow-xs transition-all",
              isTrackingMouse
                ? "group-hover:border-destructive group-hover:scale-125"
                : "opacity-80",
            )}
          >
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full bg-primary transition-colors",
                isTrackingMouse && "group-hover:bg-destructive",
              )}
            />
          </div>

          {/* Proxy Label (Positioned absolute below dot) */}
          <span
            className={cn(
              "absolute top-5 left-1/2 -translate-x-1/2 px-1 py-0.2 text-[9px] font-mono bg-background/90 rounded border border-border transition-colors whitespace-nowrap pointer-events-none",
              isTrackingMouse
                ? "text-muted-foreground group-hover:text-destructive group-hover:border-destructive/50"
                : "text-muted-foreground/70",
            )}
          >
            {hop.label}
          </span>
        </div>
      ))}

      {/* ORIGIN SERVER Node — SVG path line attaches directly to dot center at (serverPos.x, serverPos.y) */}
      <div
        style={{
          left: `${serverPos.x}px`,
          top: `${serverPos.y}px`,
          transform: "translate(-50%, -50%)",
        }}
        className="absolute pointer-events-none z-10 w-5 h-5 flex items-center justify-center"
      >
        {/* Server Icon Box (Centered exactly at serverPos.x, serverPos.y) */}
        <div className="w-5 h-5 rounded-md bg-card border-2 border-primary/80 flex items-center justify-center shadow-[var(--glow-orange)]">
          <div className="w-2 h-2 rounded-xs bg-primary" />
        </div>

        {/* Server Label (Positioned absolute below icon) */}
        <span className="absolute top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-[10px] font-mono font-bold rounded bg-card/90 text-foreground border border-border backdrop-blur-xs whitespace-nowrap">
          origin-server
        </span>

        {/* Active Server HTTP Status Response Badge Popup */}
        {activeStatus && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: -4, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-mono font-bold rounded border shadow-md whitespace-nowrap"
            style={{
              color: activeStatus.color,
              backgroundColor: activeStatus.bgColor,
              borderColor: activeStatus.color,
            }}
          >
            HTTP {activeStatus.text}
          </motion.div>
        )}
      </div>

      {/* Animated HTTP Packet Dot (Request / Response) */}
      <motion.div
        style={{
          x: packetX,
          y: packetY,
          opacity: packetOpacity,
          backgroundColor: packetColor,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-20 shadow-md transition-colors duration-300"
      />
    </div>
  );
}
