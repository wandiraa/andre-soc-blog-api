import express from "express";
import { activityRoutes } from "../../module/activity/activity.routes";
import { channelRoutes } from "../../module/channel/channel.routes";
import { documentRoutes } from "../../module/document/document.routes";
import { videoRoutes } from "../../module/video/video.routes";
import { peopleRoutes } from "../../module/people/people.routes";

const apiRoutes = express.Router();

apiRoutes.get("/", function(req, res, next) {
    res.json({ code: 200, message: "API is listen" });
});

apiRoutes.use("/activity", activityRoutes);

apiRoutes.use("/channel", channelRoutes);

apiRoutes.use("/document", documentRoutes);

apiRoutes.use("/people", peopleRoutes);

apiRoutes.use("/video", videoRoutes);

export default apiRoutes;
